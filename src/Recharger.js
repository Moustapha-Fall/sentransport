import './Recharger.css';

function Recharger({ onRecharger }) {
  return (
    <button className="btn-recharger" onClick={onRecharger}>
      Recharger
    </button>
  );
}

export default Recharger;