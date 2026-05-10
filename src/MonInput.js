const MonInput = ({valeur, ecouteChangement}) => {
    return (
        <div>
            <input value={valeur} onChange={(evenement) => ecouteChangement(evenement.target.value)}/>
        </div>
    );
} 

export default MonInput;