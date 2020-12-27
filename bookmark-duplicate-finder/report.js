function removeParameters(url) {
    const urlWithoutParameters = url.indexOf('?') >= 0
        ? url.substring(0, url.indexOf('?'))
        : url;
    return urlWithoutParameters;
}

function findAndShowDuplicates(bookmarks, ignoreParameters) {
    const map = new Map();
    bookmarks.forEach((bookmark) => {
        let url = bookmark.url;
        if (url) {
            if (ignoreParameters) {
                url = removeParameters(url);
            }
            if (!map.has(url)) {
                map.set(url, []);
            }
            map.get(url).push(bookmark);
        }
    });
    const listId = 'bookmarkDuplicatesByPath' + (ignoreParameters ? '' : 'AndQueryParams');
    const listEl = $id(listId);
    map.forEach((bookmarks, url) => {
        if (bookmarks.length > 1) {
            const listItemEl = $el('li');

            const countEl = $el('span');
            $text(countEl, bookmarks.length + ' duplicate(s) for ');
            $add(listItemEl, countEl);

            const linkEl = $link(url, url);
            $add(listItemEl, linkEl);

            const subListEl = $el('ul');
            const titleList = bookmarks.map((bookmark) => bookmark.title);
            titleList.forEach((title) => {
                const subListItemEl = $el('li');
                $text(subListItemEl, title);
                $add(subListEl, subListItemEl);
            });
            $add(listItemEl, subListEl);

            $add(listEl, listItemEl);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.bookmarks.search({}, (results) => {
        $text($id('bookmarkCount'), results.length);
        findAndShowDuplicates(results, false);
        findAndShowDuplicates(results, true);
    });
}, false);
