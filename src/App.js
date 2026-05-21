import { useState , useEffect } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';
import Recharger from './Recharger';

function App() {
  // 1. Trois etats
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);


  // 2. Charger les donnees au demarrage
  // Extraire le fetch dans une fonction separee
  function chargerLignes() {
    setChargement(true);
    setErreur(null);
    fetch("http://localhost:5000/lignes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  }
  
  useEffect(() => {
    chargerLignes();
  }, []);

  // 3. Le reste ne change pas (filtre, clic, etc.)

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(
      recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(
      recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  function handleClickLigne(ligne) {
  if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
    setLigneSelectionnee(null);
    } else {
      fetch(`http://localhost:5000/lignes/${ligne.id}`)
        .then(response => response.json())
        .then(data => {
          setLigneSelectionnee(data);
        })
        .catch(error => {
          setErreur(error.message);
        });
    }
  }

  // Ecran de chargement
  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">
            Chargement des lignes...
          </p>
        </main>
      </div>
    );
  }

  // Ecran d'erreur
  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance.</p>
            <Recharger onRecharger={chargerLignes} />
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <Recharger onRecharger={chargerLignes} />
        <p>Vous avez effectué {nbRecherches} recherche(s)</p>
        <Recherche valeur={recherche}
                   onChange={setRecherche}
                   onEffacer={() => { setNbRecherches(n => n + 1); setRecherche(""); }} />
        <p className="resultat-recherche">
          {lignesFiltrees.length} ligne
          {lignesFiltrees.length > 1 ? 's' : ''} trouvee
          {lignesFiltrees.length > 1 ? 's' : ''}
        </p>
        {lignesFiltrees.map(ligne => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={ligneSelectionnee
              && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
          />
        ))}
        {lignesFiltrees.length === 0 && (
          <p>Aucune ligne trouvée</p>
        )}
        {ligneSelectionnee
          && <DetailLigne ligne={ligneSelectionnee} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;