function NewsLink({ url }) {
  return (
    <a href={url} target="_blank">
      {url}
    </a>
  );
}

export default function NewsCard({ newsItem: { description } }) {
  // prop is newsItem then further deconstruct and access the keys you need
  return (
    <article className="newsfeed__card">
      <p>
        {description
          .split(/(https?:\/\/.*\b\/?)/g)
          .map((match, index) =>
            /https?/.test(match) ? <NewsLink key={index} url={match} /> : match
          )}
      </p>
    </article>
  );
}
