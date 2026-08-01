import os
from app import create_app

app = create_app()

print("\n========== ROUTES ==========")
for rule in app.url_map.iter_rules():
    print(rule)
print("============================\n")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )