const { useContext } = require("react");
//app.js:
const context = React.createContext();
function App() {
  return (
    <context.Provider value={}> ojo es un objeto vacio porque es el valor inical
      <MuiPickersUtilsProvider utils={ MomentUtils }>
        <Router>
          <Route exact path="/" component={Home} />
	        	...
          </Router>
         </MuiPickersUtilsProvider>
    </context.Provider>
  );
}
// file del request:
function getToken(){
    // cosas de fetch
    context.token = response.json().token; // como sea la sintaxis acá
}
function getData(){
    // cosas de llamar api 
    funcAPI(context.token);
    // demás cosas de api
    context.user = response.json();
}
// primera vista que usa la data de user: Hello.js: 
function Hello(){
    const userData = useContext(context.user);
    return(
        <>
            const firstName = userData.User.FirstName;
        </>
    );
}
  