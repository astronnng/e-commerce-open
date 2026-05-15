Param(
    [string]$RemoteUrl = "https://github.com/astronnng/e-commerce-open.git",
    [string]$Branch = ''
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git não está instalado ou não está no PATH. Instale o Git antes de prosseguir."
    exit 1
}

if (-not $Branch) {
    $Branch = (git rev-parse --abbrev-ref HEAD).Trim()
}

Write-Host "Usando branch: $Branch"
Write-Host "Usando remote: $RemoteUrl"

$remoteList = git remote
if ($remoteList -match 'origin') {
    Write-Host "Remote 'origin' existe — atualizando URL para $RemoteUrl"
    git remote set-url origin $RemoteUrl
} else {
    Write-Host "Adicionando remote 'origin' -> $RemoteUrl"
    git remote add origin $RemoteUrl
}

$status = git status --porcelain
if ($status) {
    Write-Host "Há alterações não comitadas. Fazendo add e commit automático..."
    git add -A
    git commit -m "chore: atualizando repositório local antes do push" --quiet
} else {
    Write-Host "Sem alterações a commitar."
}

Write-Host "Fazendo push para origin/$Branch..."
git push -u origin $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "Push concluído com sucesso. Verifique o repositório em: $RemoteUrl"
} else {
    Write-Error "Push falhou. Verifique credenciais e permissões do repositório remoto."
}
