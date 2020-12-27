const fetch = require('node-fetch');
const { url } = require('./sina.js');
const Feed = require('feed').Feed;
const fs = require('fs/promises');

const feed = new Feed({
  title: '新浪新闻',
  description: '新浪全球实时财经新闻直播',
  link: 'https://pluckhuang.github.io/realtime-news/',
  language: 'zh-CN',
  generator: 'sina news feed generator',
  feedLinks: {
    json: 'https://pluckhuang.github.io/realtime-news/rss.json',
    rss: 'https://pluckhuang.github.io/realtime-news/rss.xml'
  },
});


async function main() {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10130' }
    });
    const json = await response.json();
    console.log(`successfully fetch the feed.`);

    const result = json.result || {};
    if (!result.status || result.status.code !== 0) return;
    const items = result.data.feed.list;
    console.log(`successfully parse the feed.`);

    items.forEach(item => {
      feed.addItem({
        title: item.rich_text,
        id: item.id,
        link: item.docurl,
        content: '',
        date: new Date(item.create_time + '+08:00'),
      });
    });
    console.log(`successfully generating new feed.`);

    // await fs.rmdir('./dist', { recursive: true });
    // console.log(`successfully deleted ./dist`);

    // await fs.mkdir('./dist');
    // console.log(`successfully create ./dist`);

    await fs.writeFile('./dist/rss.json', feed.json1());
    console.log(`successfully write rss.json`);

    await fs.writeFile('./dist/rss.xml', feed.rss2());
    console.log(`successfully write rss.xml`);

    console.log(`successfully copy asset files`);

  } catch (err) {
    throw err;
  }
}

main();
