[<- Voltar ao Menu Principal](./README.md)

# Linux Hardening & Serviços

## 1. Complexidade de Passwords (`/etc/security/pwquality.conf`)
Editar o ficheiro com `sudo nano /etc/security/pwquality.conf`:
```ini
minlen = 14
minclass = 3
usercheck = 1
```

## 2. Bloqueio de Contas (`/etc/security/faillock.conf`)
Editar o ficheiro com `sudo nano /etc/security/faillock.conf`:
```ini
deny = 5
unlock_time = 900
fail_interval = 900
```
*(Valores em segundos: 900s = 15 minutos)*

## 3. Validade e Histórico de Passwords

### Validade Máxima (90 Dias)
Editar `/etc/login.defs`:
```ini
PASS_MAX_DAYS   90
```
Para aplicar a um utilizador existente:
```bash
sudo chage -M 90 <utilizador>
```

### Histórico de Passwords (30 Passwords)
Editar `/etc/pam.d/common-password` e adicionar a linha do módulo `pam_pwhistory.so`:
```plaintext
password required pam_pwhistory.so remember=30 use_authtok
```

## 4. Auditoria de Logs com Rsyslog (`/etc/rsyslog.d/50-security.conf`)
Criar ou editar o ficheiro com `sudo nano /etc/rsyslog.d/50-security.conf`:
```plaintext
# Logs de cron jobs com prioridade exata warning
cron.=warning    /var/log/cron_warn.log

# Logs de users com prioridade igual ou superior a notice
user.notice      /var/log/user_filtered.log
```

Validar e reiniciar o serviço:
```bash
sudo systemctl restart rsyslog
sudo systemctl status rsyslog
```

## 5. Restrição de Acesso SSH (`/etc/ssh/sshd_config`)
Editar com `sudo nano /etc/ssh/sshd_config` e adicionar no final do ficheiro:
```plaintext
AllowUsers Jane
AllowGroups Monitors
```

Validar sintaxe e reiniciar:
```bash
sudo sshd -t && sudo systemctl restart ssh
```
