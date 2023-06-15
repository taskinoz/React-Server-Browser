import styled from "styled-components"
import { discord, web, twitter } from "../data/icons";

const Link = styled.a`
    svg {
        height: 20px;
        padding: 5px;
    }
    &.discord svg {fill: #5865F2}
    &.web svg {fill: #555}
    &.twitter svg {fill: #1DA1F2}
`;

const parser = (text, keyword) => {
    let link = text.split(keyword)[1]
    link = link.split(" ")[0]
    return link
}

const Communities = ({desc}) => {
  let communities = {};

  if (desc.includes('discord.gg')){
    let link = parser(desc, 'discord.gg');
    communities.discord = {
      link: "https://discord.gg"+link,
      icon: discord,
    }
  }

  if (desc.includes("https://") && !desc.includes('discord.gg')) {
    let link = parser(desc, 'https://');
    communities.web = {
      link: "https://"+link,
      icon: web,
    }
  }

  if (desc.toLowerCase().includes('twitter')) {
    let link = parser(desc, '@');
    communities.twitter = {
      link: "https://twitter.com/"+link,
      icon: twitter,
    }
  }
  
  return (
    <>
      {(Object.keys(communities)).map(community => 
        <Link key={community} className={community} href={communities[community].link} target="_blank">{communities[community].icon}</Link>
      )}
    </>
    );
}

export default Communities