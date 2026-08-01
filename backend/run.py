import os
from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app)

print("\n========== ROUTES ==========")
for rule in app.url_map.iter_rules():
    print(rule)
print("============================\n")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True,
        use_reloader=False
    )