import json
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialiser l'application Flask
app = Flask(__name__)
CORS(app)

# Charger les donnees depuis le fichier JSON
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

with open ("arrets.json", "r") as f :
    arrets = json.load(f)

# Endpoint pour obtenir la liste de tous les arrets
@app.route("/arrets")
def get_arrets():
    return jsonify (arrets)

# Endpoint pour obtenir les details d'un arret par son ID
@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>", "/arrets"]
    })

# Endpoint pour obtenir la liste de toutes les lignes
@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

# Endpoint pour obtenir les details d'une ligne par son ID
@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    return jsonify(ligne)

# Endpoint pour les statistiques
@app.route("/stats")
def get_stats():
    total_lignes = len(lignes)
    total_arrets = sum(ligne["arrets"] for ligne in lignes)
    ligne_max = max(lignes, key=lambda l: l["arrets"])
    return jsonify({
        "total_lignes": total_lignes,
        "total_arrets": total_arrets,
        "ligne_plus_arrets": ligne_max["numero"]
    })

# Endpoint pour la recherche de lignes par nom de depart ou d'arrivee
@app.route("/lignes/recherche")
def recherche_lignes():
    q = request.args.get("q", "")
    resultats = [
        l for l in lignes
        if q.lower() in l["depart"].lower()
        or q.lower() in l["arrivee"].lower()
    ]
    return jsonify(resultats)

if __name__ == "__main__":
    app.run(debug=True, port=5000)