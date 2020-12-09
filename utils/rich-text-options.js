import { BLOCKS } from "@contentful/rich-text-types"
import { H2, H3, Paragraph, List, LandscapeImg } from '@librairy/atoms';
import { BlockCollaboration, BlockRetailer } from '@librairy/molecules';
import { v4 } from 'uuid';

export const options = {
  renderText: text => text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => {
      const h3Value = node.content[0].value.trim();
      if (h3Value.includes("livraison"))
        return <H3 id="la-livraison">{children}</H3>
      else return <H3>{children}</H3>
      },
    [BLOCKS.UL_LIST]: (node, children) => <List children={children} />,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph uuid={v4()}>{children}</Paragraph>,
    [BLOCKS.EMBEDDED_ASSET]: 
      node => 
        <LandscapeImg        
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.description}
        />,
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const fields = node.data.target.fields
      const contentType = node.data.target.sys.contentType.sys.id
      //console.log({fields})
      switch (contentType) {
        case 'collaboration':
          return <BlockCollaboration fields={fields} />
        case 'retailer':
          return <BlockRetailer fields={fields} />         
        default:
          <p>No contentType</p>
          break;
      }
    },
  }
}