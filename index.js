(async function() {
    const respnse = await fetch('content.json');
    const json = await respnse.json();

    render(json);
})();

function render(groups) {
    const page = document.getElementById('page');
    page.innerHTML = '';
    const entryTemplate = document.querySelector('#entry-template');
    const linksTemplate = document.querySelector('#links-template');

    groups.map(function(items) {
        items.map(function(item) {
            const entry = entryTemplate.content.cloneNode(true);
            const links = linksTemplate.content.cloneNode(true);

            entry.querySelector('#title').innerHTML = item.title;

            let info = '';
            if (typeof item.info === 'string') {
                info = item.info;
            } else {
                info = item.info.join(' ※ ');
            }
            entry.querySelector('#info').innerHTML = info;


            if (item.slug) {
                links.querySelector('#fountain').href = `/files/${item.slug}.fountain`;
                links.querySelector('#pdf').href = `/files/${item.slug}.pdf`;
                entry.querySelector('#links').appendChild(links);
            } else {
                const linkSection = entry.querySelector('#links-section');
                linkSection.parentElement.removeChild(linkSection);
            }

            page.appendChild(entry);
        });
        page.appendChild(document.createElement('hr'))
    });
}