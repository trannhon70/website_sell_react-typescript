import { FC } from "react";
import Delivery from "../../../Assets/img/delivery.png";
import heroBg from "../../../Assets/img/heroBg.png";
import I1 from "../../../Assets/img/i1.png";
import F1 from "../../../Assets/img/f1.png";
import C3 from "../../../Assets/img/c3.png";
import Fil from "../../../Assets/img/fi1.png";


interface DataFake {
    id: number,
    name: string,
    decp: string,
    price: number,
    imgeSrc: string
}
export const dataFake = [
    { id: 1, name: 'Icecream', decp: 'Chocolate & vanilla', price: 5.25, imgeSrc: I1 },
    { id: 2, name: 'Strawberries', decp: 'Fresh Strawberries', price: 10.25, imgeSrc: F1 },
    { id: 3, name: 'Chicken kebab', decp: 'Mixed kebab Plate', price: 8.25, imgeSrc: C3 },
    { id: 4, name: 'Fish kebab', decp: 'Mixed fish kebab', price: 5.25, imgeSrc: Fil },
] as DataFake[]
const HomeContainer: FC = () => {
    return <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full " id="home">
        <div className="py-2 flex-1 flex flex-col items-start  justify-start gap-6"  >
            <div className="flex items-center gap-2 justify-center bg-orange-200 px-4 py-1 rounded-full">
                <p className="text-base text-orange-500 font-semibold" >Bike Delivery</p>
                <div className="w-10 h-10 rounded-full overflow-hidden drop-shadow-xl">
                    <img src={Delivery} alt="..." className="w-full h-full object-contain bg-white " />
                </div>
            </div>
            <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor" >
                The Fastest Delivery in {" "}
                <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Your City</span>
            </p>
            <p className="text-base text-textColor text-center md:text-left lg:w-[80%]" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veniam fuga sapiente unde aliquid necessitatibus reiciendis beatae aut rem ipsum suscipit, molestiae, eaque officiis doloremque? Autem accusamus numquam id sint?</p>
            <button className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100" type="button">Order Now</button>

        </div>
        <div className="py-2 flex-1 flex items-center relative">
            <img src={heroBg} alt="" className="ml-auto h-420 w-full lg:w-auto lg:h-650 " />

            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center  py-4 gap-4 flex-wrap">
                {
                    dataFake && dataFake.map((n) => {
                        return <div key={n.id} className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                            <img src={n.imgeSrc} alt="" className="w-20 -mt-10 lg:w-40 lg:-mt-20" />
                            <p className="text-base font-semibold text-textColor mt-2 lg:text-xl lg:mt-4 ">
                                {n.name}
                            </p>
                            <p className=" text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                {n.decp}
                            </p>
                            <p className="text-sm font-semibold text-headingColor">
                                <span className="text-xs text-red-600">$</span>{n.price}
                            </p>
                        </div>
                    })
                }
            </div>

        </div>
    </section>
}
export default HomeContainer;