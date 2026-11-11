[← Voltar ao Menu Principal](./README.md)

# 📜 Scripts Forenses & Triage Rápida

> **Atenção à Prova:** Os scripts desenvolvidos deverão ser guardados dentro de uma pasta chamada `scripts` no **Ambiente de Trabalho da máquina Windows**.

---

## 1. Script PowerShell (`C:\Users\<User>\Desktop\scripts\inventory.ps1`)

Cria o ficheiro `inventory.ps1` com o seguinte código:

```powershell
# =========================================================
# Script Forense - Windows Triage (WorldSkills)
# =========================================================

Write-Host "=== 1. LISTA DE ADMINISTRADORES LOCAIS ===" -ForegroundColor Cyan
Get-LocalGroupMember -Group "Administrators" | Select-Object Name, PrincipalSource

Write-Host "`n=== 2. SESSÕES RDP ATIVAS ===" -ForegroundColor Cyan
qwinsta

Write-Host "`n=== 3. SERVIÇOS DO WINDOWS ===" -ForegroundColor Cyan
Get-Service | Select-Object Name, DisplayName, Status, StartType
```

Para testar a execução:
```powershell
Set-ExecutionPolicy -Scope Process Bypass -Force
.\inventory.ps1
```

## 2. Script Bash (`C:\Users\<User>\Desktop\scripts\inventory.sh` ou Linux)

Cria o ficheiro `inventory.sh` com o seguinte código:

```bash
#!/bin/bash

# =========================================================
# Script Forense - Linux Triage (WorldSkills)
# =========================================================

echo "================================================="
echo "=== 1. CONTEÚDO DO FICHEIRO /etc/hosts ==="
echo "================================================="
cat /etc/hosts

echo -e "\n================================================="
echo "=== 2. PROCESSOS ATIVOS NO SISTEMA ==="
echo "================================================="
ps aux

echo -e "\n================================================="
echo "=== 3. CONEXÕES DE REDE ABERTAS E PORTAS ==="
echo "================================================="
ss -tulnp
```

Para tornar executável no Linux:
```bash
chmod +x inventory.sh
./inventory.sh
```

