import './Recherche.css';

function Recherche({ valeur, onChange, onEffacer}) {
  return (
    <div className="recherche">
      <input type="text" className="recherche-input" 
        placeholder="Rechercher une ligne (depart, arrivee)..."
        value={valeur}
        onChange={e => onChange(e.target.value)}
      />
      <div className="button">
        <button onClick={onEffacer}>Effacer</button>
      </div>
    </div>
  );
}

export default Recherche;