import React from 'react'
import { Collapsible } from "vtex.styleguide";
import { useCssHandles } from 'vtex.css-handles'
import { StorefrontFunctionComponent } from '../../types/vtex';
import './index.css'

const HANDLES = [
  'collapsible',
  'collapsible-open',
  'collapsible-content',
  'collapsible-container'
]

type props = {
    Header:any,
    iconSize?: number,
    open: boolean,
    setOpen: any
    showIcon?: boolean
}

const CollapsibleContainer:StorefrontFunctionComponent<props> = ({children,Header, open, setOpen}) => {
    const {handles} = useCssHandles(HANDLES)

    return (
      <div className={handles["collapsible-container"]}>
        <Collapsible
            header={
                <div className={`${handles["collapsible"]} ${open?handles["collapsible-open"]:""}`}>
                    <Header/>
                </div>
            }
            align="right"
            onClick={()=>{setOpen(!open)}}
            isOpen={open}
            >
              <div className={handles["collapsible-content"]}>{children}</div>
        </Collapsible>
      </div>
    )
}

export default CollapsibleContainer
