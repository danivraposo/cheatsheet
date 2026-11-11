# Cyber Security Hub
---
## Menu Principal

* [**Windows Hardening & GPO**](./windows-hardening.md)
  * Políticas de Passwords e Account Lockout (Local & AD)
  * Ativação de Audit Policies (Event IDs 4625, 4720, 7045)
  * RBAC, Grupos e Acessos Remotos (RDP / WinRM)

* [**Linux Hardening & Serviços**](./linux-hardening.md)
  * Módulos PAM (`pwquality`, `faillock`, `pwhistory`)
  * Auditoria de Logs com `rsyslog`
  * Controlo de Acesso SSH (`sshd_config`)

* [**Partilhas de Rede & Permissões**](./rede-partilhas.md)
  * Servidor Samba (`smb.conf`) com permissões Read/Write por utilizador
  * Permissões de Partilha Windows (Share + NTFS Security)
  * Testes de Conectividade e Diagnóstico de Portas

* [**Scripts Forenses & Triage Rápida**](./scripts-forenses.md)
  * Script PowerShell (`inventory.ps1`) para recolha de evidências
  * Script Bash (`inventory.sh`) para processos, conexões e hosts

---

### Atalhos de Consola Rápidos

* **PowerShell Bypass:** `Set-ExecutionPolicy -Scope Process Bypass -Force`
* **Reiniciar Serviço Linux:** `sudo systemctl restart <servico>`
* **Validar SSH:** `sudo sshd -t`
