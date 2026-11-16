(function () {
    function criarBotaoDownload() {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = "Download";
        button.title = "Descarregar esta página como ficheiro de texto";
        button.style.cssText = [
            "position: fixed",
            "top: 10px",
            "right: 10px",
            "z-index: 1000",
            "padding: 4px 8px",
            "border: 1px solid #adb5bd",
            "border-radius: 4px",
            "background: #f8f9fa",
            "color: #343a40",
            "cursor: pointer",
            "font: 12px Segoe UI, sans-serif"
        ].join(";");

        button.addEventListener("click", function () {
            var corpo = document.body.cloneNode(true);
            corpo.querySelectorAll("button, script").forEach(function (elemento) {
                elemento.remove();
            });

            var conteudo = [
                document.title,
                "=".repeat(document.title.length),
                formatarElemento(corpo).trim()
            ].filter(Boolean).join("\n\n") + "\n";
            var blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            var nome = document.title.replace(/[\\/:*?"<>|]+/g, "").trim() || "pagina";

            link.href = url;
            link.download = nome + ".txt";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        });

        document.body.appendChild(button);
    }

    function formatarElemento(elemento) {
        if (elemento.nodeType === Node.TEXT_NODE) {
            return elemento.textContent.replace(/\s+/g, " ");
        }

        if (elemento.nodeType !== Node.ELEMENT_NODE) {
            return "";
        }

        var texto = elemento.textContent.trim();
        var tag = elemento.tagName.toLowerCase();

        if (!texto && tag !== "pre") {
            return "";
        }

        if (tag === "pre") {
            return "\n\n--- COMANDOS ---\n" + texto + "\n--- FIM DOS COMANDOS ---\n";
        }

        if (/^h[1-6]$/.test(tag)) {
            return "\n\n" + "#".repeat(Number(tag.substring(1))) + " " + texto + "\n";
        }

        if (tag === "li") {
            return "\n- " + texto + "\n";
        }

        if (tag === "p") {
            return "\n" + texto + "\n";
        }

        return Array.from(elemento.childNodes)
            .map(formatarElemento)
            .join("");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", criarBotaoDownload);
    } else {
        criarBotaoDownload();
    }
})();
