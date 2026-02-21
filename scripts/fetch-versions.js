const repos = [
    'dani-garcia/vaultwarden',
    'keepassxreboot/keepassxc',
    'passbolt/passbolt_api',
    'psono/psono-server',
    'buttercup/buttercup-desktop',
    'padloc/padloc',
    'keeweb/keeweb',
    'passky-dev/passky-server'
];

async function main() {
    for (const repo of repos) {
        try {
            const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
                headers: { 'User-Agent': 'foss-compare-script' }
            });
            if (res.ok) {
                const data = await res.json();
                console.log(`${repo}: ${data.tag_name} - ${data.html_url}`);
            } else {
                console.log(`${repo}: API Error ${res.status}`);
            }
        } catch (e) {
            console.log(`${repo}: Error ${e.message}`);
        }
    }
}
main();
