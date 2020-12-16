import { H2, Paragraph, SquareImg, Subtitle } from "@librairy/atoms";
import { v4 as uuid } from 'uuid';
import { SocialNetworkIcons } from "@librairy/molecules";

export const InstaFeed = ({ feed }) => {
  return (
    <section className="instafeed">
      <H2>Réseaux sociaux</H2>
      <Subtitle>Suivez les coulisses du studio.</Subtitle>
      <Paragraph>
        <SocialNetworkIcons />
      </Paragraph>
      <div id="feed-container">
        {
          feed.map(post => (
            <div key={uuid()} className="instafeed-image">
              <a href={post.link} rel="noreferrer nofollow">
                <SquareImg src={post.photo.fields.file.url} alt={post.photo.fields.title} />
              </a>
            </div>
          ))
        }
      </div>
    </section>
  )
}