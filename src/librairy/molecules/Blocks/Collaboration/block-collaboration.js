import PropTypes from "prop-types";
import { H3, LandscapeImg, Paragraph } from "@librairy/atoms";

export const BlockCollaboration = ({ fields }) => (
  <div className="block-collaboration">
    <H3>{fields.company}</H3>
    <LandscapeImg src={fields.image.fields.file.url} alt={fields.image.fields.description} />
    <div className="block-collaboration-infos">
      <em>{fields.typeOfProduct}</em>
      <Paragraph>
        {fields.description}
        <a href={fields.url} rel="noreferrer" className="block-collaboration-url">En savoir plus sur {fields.company}.</a>
      </Paragraph>
    </div>
  </div>
)

BlockCollaboration.propTypes = {
  fields: PropTypes.shape({
    company: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      fields: PropTypes.shape({
        description: PropTypes.string,
        file: PropTypes.shape({
          url: PropTypes.string
        })
      })
    }),
    typeOfProduct: PropTypes.string,
    url: PropTypes.string
  })
}