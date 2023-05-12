import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles';
import { Group } from '../ArmaTuPack';
import { ProductSummaryList } from "vtex.product-summary"
import { SliderLayout } from "vtex.slider-layout"
import { useRuntime } from 'vtex.render-runtime';
import CollapsibleContainer from './Collapsible';

const CSS_HANDLES = [
    "groups",
    "groups-list",
    "groups-shelf",
    "group",
    "group-selected",
    "groups-footer",
    "groups-footer__button"
]

interface Props {
    groups: Group[]
    groupSelected: Group
    setGroupSelected: React.Dispatch<React.SetStateAction<Group>>
    ProductSummary: React.ComponentType<{
        product: any;
        actionOnClick: any;
    }>
}

const Groups:FC<Props> = ({groups, groupSelected, setGroupSelected, ProductSummary}) => {

    const { handles } = useCssHandles(CSS_HANDLES)

    const handleGroup = (group: Group) => setGroupSelected(group)

    const {
        deviceInfo: { isMobile }
    } = useRuntime()

    if(isMobile) return (
        <div className={handles["groups"]}>
            {groups?.map((group, index)=> (
                <CollapsibleContainer 
                    Header={()=>(
                        <div className={`${handles["group"]} ${group == groupSelected ? handles["group-selected"] : ""}`} onClick={()=>handleGroup(group)}>
                            {index+1}. {group.name}    
                        </div>
                    )}
                    open={group == groupSelected}
                    setOpen={()=> handleGroup(group)}
                >
                    <div className={handles["groups-shelf"]}>
                        <ProductSummaryList ProductSummary={ProductSummary} collection={groupSelected.idCollection} hideUnavailableItems={true}>
                            <SliderLayout itemsPerPage={{desktop: 3, mobile: 2}} showNavigationArrows="never"/>
                        </ProductSummaryList>
                    </div>
                </CollapsibleContainer>
            ))}
        </div>
    )

    return (
        <div className={handles["groups"]}>
            <ul className={handles["groups-list"]}>
                {groups?.map((group, index)=> (
                    <li className={`${handles["group"]} ${group == groupSelected ? handles["group-selected"] : ""}`} onClick={()=>handleGroup(group)}>
                       {index+1}. {group.name}    
                    </li>
                ))}
            </ul>
            <div className={handles["groups-shelf"]}>
                    <ProductSummaryList ProductSummary={ProductSummary} collection={groupSelected.idCollection} hideUnavailableItems={true}>
                        <SliderLayout itemsPerPage={{desktop: 3, mobile: 2}} showNavigationArrows="never"/>
                    </ProductSummaryList>
                    <div className={handles["groups-footer"]}>
                        {groups.indexOf(groupSelected) != 0 && (
                            <button className={handles["groups-footer__button"]} onClick={()=> handleGroup(groups[groups.indexOf(groupSelected) - 1])}>
                                <svg width={30} height={30} id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.35 39.35">
                                    <rect fill='#ff4d00' width="39.35" height="39.35"/>
                                    <polyline fill='none' stroke='#fff' strokeLinecap='round' strokeMiterlimit={10} strokeWidth={2}  points="26.76 5.29 12.59 19.47 26.76 33.65"/>
                                </svg>
                            </button>
                        )}
                        {groups.indexOf(groupSelected) != groups.length - 1 && (
                            <button className={handles["groups-footer__button"]} onClick={()=> handleGroup(groups[groups.indexOf(groupSelected) + 1])}>
                                <svg width={30} height={30} id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.35 39.35">
                                    <rect fill='#ff4d00' width="39.35" height="39.35"/>
                                    <polyline fill='none' stroke='#fff' strokeLinecap='round' strokeMiterlimit={10} strokeWidth={2} points="12.59 5.29 26.76 19.47 12.59 33.65"/>
                                </svg>
                            </button>
                        )}
                    </div>
            </div>
        </div>
    )
}

export default Groups