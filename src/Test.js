import { useState } from "react";
import MonInput from "./MonInput";

const Test = () => {
    const [compteur, modifierCompteur] = useState(0);
    const [nom, modifierNom] = useState("Moustapha Fall");
  return (
    <div>
      <h1>Test Component</h1>
      <p>This is a simple test component.</p>

      <p>Compteur: {compteur}</p>
      <button onClick={() => modifierCompteur(compteur + 1)}>
        Increment
      </button>
        <div>
            <input value={nom} onChange={(evenement) => modifierNom(evenement.target.value)}/>
            
            <MonInput valeur={nom} ecouteChangement={modifierNom} />
        </div>
    </div>
  );
};

export default Test;