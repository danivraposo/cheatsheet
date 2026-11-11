[← Voltar ao Menu Principal](./README.md)

# 🪟 Windows Hardening & GPO

## 1. Políticas de Passwords e Account Lockout (PowerShell Rápido)
```powershell
# Aplicação direta de políticas locais (Mínimo 14 chars, 90 dias, 20 histórico, bloqueio 5 tentativas em 15 min)
net accounts /minpwlen:14 /maxpwage:90 /uniquepw:20 /lockoutthreshold:5 /lockoutduration:15 /lockoutwindow:15

# Permitir execução de scripts na sessão atual
Set-ExecutionPolicy -Scope Process Bypass -Force
```

## 2. Consolas Gráficas de Gestão (GUI)
* **Local Security Policy:** `Win + R` → `secpol.msc`
* **Active Directory Group Policy (no DC):** `Win + R` → `gpmc.msc`

## 3. Navegação em Consola (secpol.msc)

### Password Policy
Navegar para: `Security Settings` > `Account Policies` > `Password Policy`
* **Enforce password history:** 20 passwords
* **Maximum password age:** 90 days
* **Minimum password length:** 14 characters
* **Password must meet complexity requirements:** Enabled

### Account Lockout Policy
Navegar para: `Security Settings` > `Account Policies` > `Account Lockout Policy`
* **Account lockout threshold:** 5 invalid logon attempts
* **Account lockout duration:** 15 minutes
* **Reset account lockout counter after:** 15 minutes

## 4. Auditoria e Logs do Windows (Advanced Audit Policy)
Navegar para: `Security Settings` > `Advanced Audit Policy Configuration` > `System Audit Policies`
* **Policy Change:** Audit Policy Change → Marcar Success e Failure
* **Privilege Use:** Audit Sensitive Privilege Use → Marcar Success e Failure
* **Detailed Tracking:** Audit Process Creation → Marcar Success e Failure

### Consulta de Event IDs Úteis
```powershell
# Tentativas de login falhadas
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 5

# Criação de utilizadores
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4720} -MaxEvents 5

# Instalação de novos serviços
Get-WinEvent -FilterHashtable @{LogName='System'; Id=7045} -MaxEvents 5
```

## 5. RBAC & Grupos Locais
```powershell
# Criar Grupo e Utilizadores
New-LocalGroup -Name "Monitors"

# Adicionar Acessos Remotos e Privilégios (Jane: RDP | John: CLI/WinRM | Monitors: Performance)
Add-LocalGroupMember -Group "Remote Desktop Users" -Member "Jane"
Add-LocalGroupMember -Group "Remote Management Users" -Member "John"
Add-LocalGroupMember -Group "Performance Monitor Users" -Member "Monitors"
```

