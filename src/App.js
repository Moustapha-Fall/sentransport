import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import StatReseau from './StatReseau';

function App() {
  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14, couleur: "#3498db" },
    { id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place de l'Obélisque", arrets: 18, couleur: "#2ecc71" },
    { id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12, couleur: "#e74c3c" },
    { id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10, couleur: "#f39c12" },
    { id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16, couleur: "#9b59b6" },
    { id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11, couleur: "#1abc9c" },
    { id: 7, numero: "5", depart: "Dakar Plateau", arrivee: "Hann", arrets: 13, couleur: "#e67e22" },
    { id: 8, numero: "3", depart: "Mermoz", arrivee: "Fass", arrets: 9, couleur: "#34495e" },
    { id: 9, numero: "10", depart: "Liberté 5", arrivee: "Keur Massar", arrets: 17, couleur: "#c0392b" },
    { id: 10, numero: "18", depart: "Grand Yoff", arrivee: "Medina", arrets: 15, couleur: "#8e44ad" }
  ];

  const lignePlusArrets = lignes.reduce((max, ligne) => (ligne.arrets > max.arrets ? ligne : max), lignes[0]);

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <StatReseau nombreLignes={lignes.length} nombreArrets={lignes.reduce((acc, ligne) => acc + ligne.arrets, 0)} lignePlusArrets={lignePlusArrets.numero}/>
        <ListeLignes lignes={lignes} />
      </main>
      <Footer />
    </div>
  );
}

export default App;