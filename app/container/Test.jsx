import React, { Component } from 'react';
import DropdownMenu from '../components/Dropdown/DropdownMenu';
import DropdownMenuItem from '../components/Dropdown/DropdownMenuItem';
import DropdownSubmenu from '../components/Dropdown/DropdownSubmenu';
import DropdownMenuVertical from '../components/Dropdown/DropdownMenuVertical';
import Collapsible from '../components/Collapsible/Collapsible';
import CollapsibleCollection from '../components/Collapsible/CollapsibleCollection';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SideNav from '../components/SideNav/SideNav';
import SideNavSubmenu from '../components/SideNav/SideNavSubmenu';
import SideNavItem from '../components/SideNav/SideNavItem';
// import Lable from '../components/Lable/Lable';
import icon_communicators from '../assets/images/icons/communicators.svg';
import icon_culturally_diverse from '../assets/images/icons/culturally_diverse.svg';
import icon_first_australian from '../assets/images/icons/first_astralian.svg';
import icon_innovative from '../assets/images/icons/innovative.svg';
import icon_knowledgeable from '../assets/images/icons/knowledgeable.svg';
import icon_socially_responsible from '../assets/images/icons/socially_responsible.svg';

class Test extends Component {
  constructor(props, context) {
    super(props, context);
    console.log('render test');
  }

  renderMenuItem() {
    const menuItem = [
      {
        src: icon_knowledgeable,
        alt: 'icon-knowledgeable',
        title: 'Knowledgeable and skilled, with critical judgement'
      },
      {
        src: icon_communicators,
        alt: 'icon-communicators',
        title: 'Effective communicators and collaborators'
      },
      {
        src: icon_innovative,
        alt: 'icon-innovative',
        title: 'Innovative, creative and entrepreneurial'
      },
      {
        src: icon_socially_responsible,
        alt: 'icon-socially-responsible',
        title: 'Socially responsible and engaged in their communities'
      },
      {
        src: icon_first_australian,
        alt: 'icon-first-australian',
        title: 'Culturally capable when working with First Australians'
      },
      {
        src: icon_culturally_diverse,
        alt: 'icon-culturally-diverse',
        title: 'Effective in culturally diverse and international environments'
      }
    ];
    return menuItem.map((item, index) =>
      <DropdownMenuItem index={index}>
        <img src={item.src} alt={item.alt} />
        {item.title}
      </DropdownMenuItem>
    );
  }

  render() {
    // console.log(this.props);
    return (
      <div
        style={{
          backgroundColor: 'grey',
          height: '100vh',
          paddingTop: '300px'
        }}
      >
        <SideNav title="Griffith Attributes">
          <SideNavSubmenu>
            <SideNavItem>TEST 1</SideNavItem>
            <SideNavItem>TEST 2</SideNavItem>
            <SideNavItem>TEST 3</SideNavItem>
            <SideNavItem>TEST 4</SideNavItem>
          </SideNavSubmenu>
        </SideNav>
        <div>
          {/*<Header></Header>*/}
        </div>
        {/*<div style={{ width: '25%' }}>*/}
        {/*<DropdownMenuVertical selectedTab={1} title="GRIFFITH ATTRIBUTES">*/}
        {/*{this.renderMenuItem()}*/}
        {/*</DropdownMenuVertical>*/}
        {/*</div>*/}
        <div style={{ width: '50%' }}>
          <CollapsibleCollection>
            <Collapsible title="header 1">
              <h2>kao bei</h2>
              <div
                style={{ width: '100%', height: '200px', background: 'green' }}
              >
                hello
              </div>
            </Collapsible>
            <Collapsible title="header 2">
              <h2>kao bei</h2>
              <div
                style={{ width: '100%', height: '200px', background: 'green' }}
              >
                hello
              </div>
            </Collapsible>
            <Collapsible title="header 3">
              <h2>kao bei</h2>
              <div
                style={{ width: '100%', height: '200px', background: 'green' }}
              >
                hello
              </div>
            </Collapsible>
          </CollapsibleCollection>
        </div>
      </div>
    );
  }
}

Test.propTypes = {};
Test.defaultProps = {};

export default Test;
