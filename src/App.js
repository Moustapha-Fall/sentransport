import './App.css';
import Header from './Header';
import Footer from './Footer';
import Statistique from './Statistique';

  function App () {
  return (
    <div className = "App">
    < Header/>
      <main className = "contenu">
        <p> Bienvenue ! Cette application vous aide à trouver
            votre ligne de bus à Dakar.
        </p>
        <Statistique chiffre={42} libelle="buses" />
        <Statistique chiffre={10} libelle="lignes" />
        <Statistique chiffre={150} libelle="arrêts" />
      </main >
      <Footer/>
    </div >
    
  );
}
export default App ;