import { IconMini } from "@librairy/atoms"
import { socialNetworkLinks } from "@utils/site-constants"

export const SocialNetworkIcons = () => {
  return (
    <div style={{display:'flex', width: '80%', justifyContent: 'space-around'}}>
      <IconMini src='/svg/facebook.svg' alt='Facebook' href={socialNetworkLinks.facebook} />
      <IconMini src='/svg/instagram.svg' alt='Instagram' href={socialNetworkLinks.instagram} />
      <IconMini src='/svg/pinterest.svg' alt='Pinterest' href={socialNetworkLinks.pinterest} />
      <IconMini src='/svg/tiktok.svg' alt='Tiktok' href={socialNetworkLinks.tiktok} />
    </div>
  )
}