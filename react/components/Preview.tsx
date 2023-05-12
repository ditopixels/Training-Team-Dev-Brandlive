import React, { useContext } from 'react'
import { ArmaTuPackContext } from '../ArmaTuPack'
import { Image } from "vtex.store-image"
import { useRuntime } from 'vtex.render-runtime';
import AddToCart from './AddToCart';
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
  "preview",
  "preview-grid",
  "preview-grid__item"
]

const Preview = () => {

  const { productsSelecteds, groups } = useContext(ArmaTuPackContext)
  const {
    deviceInfo: { isMobile }
  } = useRuntime()
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles["preview"]}>
      <div className={handles["preview-grid"]}>
        {groups?.map((group, index)=>(
          <div className={handles["preview-grid__item"]}>
            {(productsSelecteds && productsSelecteds[index]) && (
              <Image src={productsSelecteds[index].image} alt={group.name}/>
            )}
          </div>
        ))}
      </div>
      {!isMobile && (
        <>
          =
          <AddToCart/>
        </>
      )}
    </div>
  )
}

export default Preview