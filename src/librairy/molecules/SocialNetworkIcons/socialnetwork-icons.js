import { IconMini } from "@librairy/atoms"
import { socialNetworkLinks } from "@utils/site-constants"

export const SocialNetworkIcons = () => {
  return (
    <>
      <IconMini src='/svg/facebook.svg' alt='Facebook' href={socialNetworkLinks.facebook} />
      <IconMini src='/svg/instagram.svg' alt='Instagram' href={socialNetworkLinks.instagram} />
      <IconMini src='/svg/pinterest.svg' alt='Pinterest' href={socialNetworkLinks.pinterest} />
    </>
  )
}