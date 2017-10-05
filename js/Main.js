let AddForm = React.createClass({
   propTypes: {
        onChange: React.PropTypes.func.isRequired,
            onSubmit: React.PropTypes.func.isRequired,
               vehicle: React.PropTypes.object.isRequired,

    },
    
    onNameChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.vehicle, {name: e.target.value}));
    },
   
    onManufacturersChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.vehicle, {manufacturers: e.target.value}));
    },
   
    onSubmit: function() {
        this.props.onSubmit(this.props.vehicle);
    },
   
    render: function() {
        return (
            React.createElement("form", {},
            React.createElement("input", {
            type: "text",
            placeholder: "Name",
            className:"name",
            value: this.props.vehicle.name,               onChange: this.onNameChange}),
                
            React.createElement("input", {
            type: "text",
            placeholder: "Manufacturers",               className:"Manufacturers",
            value: this.props.vehicle.manufacturers,
            onChange: this.onManufacturersChange}),
               
            React.createElement("a", {href: "#"},
            React.createElement("button", {className:"submitBtn", type: "button", onClick: this.onSubmit}, "Submit"))
            )
                );
                    }
                        });

let FormView = React.createClass({
    propTypes: {
        vehicle: React.PropTypes.object.isRequired,
        vehicles: React.PropTypes.array.isRequired,
        newVehicleChange: React.PropTypes.func.isRequired,
        submitNewVehicle: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement("div", {}),
                React.createElement(AddForm, {vehicle: this.props.vehicle, onChange: this.props.newVehicleChange, onSubmit: this.props.submitNewVehicle}))
        );
            }
                });

function updateVehicle(vehicle) {
    setState({vehicle: vehicle});
}
function addNewVehicle(vehicle) {
    let vehicleList = state.vehicles;
    vehicleList.push(Object.assign({}, {key: vehicleList.length + 1, id: vehicleList.length + 1}, vehicle));
    setState({vehicles: vehicleList});
}


let MainPage = React.createClass({
    propTypes: {
        "id": React.PropTypes.number,
        "name": React.PropTypes.string,
        "manufacturers": React.PropTypes.string,
    },
    render: function () {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu, {}),
                React.createElement(showList, state, {}))
        );
          }
           });

let AddNewVehiclePage = React.createClass({
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu, {}),
                React.createElement("h2", {className:"vehicleName"}, "Add A Vehicle"),
                React.createElement(FormView, Object.assign({}, state, {
                    newVehicleChange: updateVehicle,
                    submitNewVehicle: addNewVehicle
                })))
                    );
                         }
                            });

let VehiclePage = React.createClass({
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu,{}),
                React.createElement("h2", {className:"vehicleName"},this.props.name),
                React.createElement("h4", {className:"vehicleManufacturers"}, this.props.manufacturers))
        );
            }
                });


let ListItem = React.createClass({ propTypes: {
        "id": React.PropTypes.number,
        "name": React.PropTypes.string,
        "email": React.PropTypes.string
    },

    render: function(){
        return (React.createElement("a", {className:"list-group-item", href: "#item/" + this.props.id},
                React.createElement("h2", {className:"vehicle-name"},this.props.name))
        );
            }
                }); 

let showList = React.createClass({
    propTypes: {
        "vehicles": React.PropTypes.array,
    },

    render: function(){
        let VehicleList = this.props.vehicles.map(function(item){
            return React.createElement(ListItem, item);
        });
        return (
            React.createElement("ul", {className: "list-group"},
                VehicleList
    )
        );
            }
                });

let NavMenu = React.createClass({
    render: function() {
        return (
            React.createElement("nav", {className: "navbar navbar-expand-lg navbar-dark bg-dark"},
              React.createElement("div", {className: "navbar-collapse", id: "navbarNav"},
                 React.createElement("ul", {className: "navbar-nav"},
                    React.createElement("li", {className: "nav-item"},
                        React.createElement("a", {className: "nav-link", href: "#"}, "Vehicle List")
                        ),  
                        React.createElement("li",               {className: "nav-item"},
                            React.createElement("a", {className: "nav-link", href: "#newitem"}, "Add new vehicle")
                  )
                     )
                        )
                        ));}
                            });

let state = {
    location: ""
};

function setState(changes) {
    let component;
    let componentProperties = {};

    Object.assign(state, changes);

    let splittedUrl = state.location.replace(/^#\/?|\/$/g, "").split("/");

    switch(splittedUrl[0]) {
    case "newitem":
        component = AddNewVehiclePage;
        break;
    
        case "item":
        component = VehiclePage;
        componentProperties = vehicles.find(i => i.key == splittedUrl[1]);
        break;
    default:
        component = MainPage;
    }

    ReactDOM.render(React.createElement(component, componentProperties), document.getElementById("react-app"));
}

window.addEventListener("hashchange", ()=>setState({location: location.hash}));

setState({location: location.hash, 
    vehicle:{
        name: "",
        email: ""
    },
    vehicles: vehicles 
});