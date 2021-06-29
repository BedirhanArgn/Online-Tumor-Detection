import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import PatientPage from "./containers/PatientPage/PatientPage";
import DoctorPage from './containers/DoctorPage/DoctorPage';
import Layout from "./layout/Layout";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import ProtectedRoute from './authentication/ProtectedRoute';
import HomePage from "./containers/HomePage/HomePage";
import HistoryForm from './containers/HistoryForm/HistoryForm';
import TumorClassification from "./containers/TumorClassification/TumorClassificaion";
import PatientMessage from './containers/PatientMessage/PatientMessage';
import ListPatients from "./containers/ListPatients/ListPatients";
import './App.css';
import PatientTumorVarieties from "./containers/PatientTumorVarieties/PatientTumorVarieties";
import PatientBrainTumor from "./containers/PatientBrainTumorPage/PatientBrainTumor";
import DoctorMessage from "./containers/DoctorMessage/DoctorMessage";
import TumorDetection from './containers/TumorDetection/TumorDetection';

function App() {
    let routes = (
        <Switch>
            <ProtectedRoute authorization="patient" exact path='/patient/story' component={HistoryForm}/>
            <ProtectedRoute authorization="patient" exact path='/patient' component={PatientPage}/>
            <ProtectedRoute authorization="patient" exact path='/patient/message' component={PatientMessage}/>
            <ProtectedRoute authorization="patient" exact path='/patient/braintumor' component={PatientBrainTumor}/>
            <ProtectedRoute authorization="doctor" exact path='/doctor' component={DoctorPage}/>
            <ProtectedRoute authorization="doctor" exact path='/doctor/patients' component={ListPatients} />
            <ProtectedRoute authorization="doctor" exact path='/doctor/classify/tumor' component={TumorClassification} />
            <ProtectedRoute authorization="doctor" exact path='/doctor/detect/tumor' component={TumorDetection} />
            <ProtectedRoute authorization="doctor" exact path='/doctor/messages' component={DoctorMessage} />
            <ProtectedRoute authorization="patient" exact path='/patient/braintumor/varieties' component={PatientTumorVarieties} />
        </Switch>
    );

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route exact path='/login'>
                        <Login/>
                    </Route>
                    <Route exact path='/register'>
                        <Register/>
                    </Route>
                    <Layout>{routes}</Layout>
                </Switch>
            </Router>
        </div>);
}

export default App;
