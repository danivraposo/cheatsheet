[<- Voltar ao Menu Principal](./README.md)

# Partilhas de Rede & Permissões

## 1. Servidor Samba no Linux (`/etc/samba/smb.conf`)

### Pré-requisitos
```bash
sudo apt install samba -y
sudo smbpasswd -a Jane
sudo smbpasswd -a John
```

### Configuração do Ficheiro (`/etc/samba/smb.conf`)
Adicionar ao final do ficheiro:
```ini
[public]
   path = /home/aluno/Desktop/public
   read only = yes
   guest ok = no
   browseable = yes

[private]
   path = /home/aluno/Desktop/private
   read only = no
   valid users = Jane, John
   read list = Jane
   write list = John
   browseable = yes
```

Reiniciar serviço:
```bash
sudo systemctl restart smbd
```

## 2. Permissões de Partilha no Windows (Share + NTFS)

### Estrutura Exigida
* **public:** Todos os utilizadores autenticados apenas com leitura (Read).
* **private:** Jane com Read, John com Read + Write (Change), restantes sem acesso.

### Configuração Passo a Passo (GUI)
1. Clique direito na pasta > **Properties** > **Sharing** > **Advanced Sharing**.
2. Marcar **Share this folder** > Clicar em **Permissions**:
   * **public:** Adicionar `Authenticated Users` -> Apenas Read.
   * **private:** Adicionar `Jane` (Read) e `John` (Change/Read). Remover `Everyone`.
3. Na aba **Security** (NTFS), aplicar exatamente as mesmas permissões para garantir que a permissão mais restritiva não bloqueia o acesso.

## 3. Diagnóstico e Testes de Conectividade de Rede

### Windows (PowerShell)
```powershell
# Verificar IP, Gateway e DNS
Get-NetIPConfiguration

# Testar se a porta 80 está aberta num servidor remoto
Test-NetConnection 192.168.27.20 -Port 80

# Listar portas em escuta local
Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess
```

### Linux (Bash)
```bash
# Listar portas abertas e processos associados
ss -tulnp

# Testar resolução DNS
nslookup dc.wsp27.pt

# Testar conectividade a uma porta
nc -zv 192.168.27.20 80
```
