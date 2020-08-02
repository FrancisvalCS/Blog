import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyByPTQtZi_XyA_8hbeeLGp3vBftunLFpDo",
    authDomain: "reactapp-f5547.firebaseapp.com",
    databaseURL: "https://reactapp-f5547.firebaseio.com",
    projectId: "reactapp-f5547",
    storageBucket: "reactapp-f5547.appspot.com",
    messagingSenderId: "875597826568",
    appId: "1:875597826568:web:a5d648d51cc57c69e31fbd",
    measurementId: "G-BZRPTR8FY4"
  };



class Firebase{
  constructor(){
    // Initialize Firebase
     app.initializeApp(firebaseConfig)
     this.app = app.database();
     /*if(!firebase.apps.length){
       firebase.initializeApp(firebaseConfig);
     }*/
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password);

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome:nome
    })
  }

  isInitialized(){
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }
}

export default new Firebase();
