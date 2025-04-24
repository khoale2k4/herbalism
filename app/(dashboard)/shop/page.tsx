import { FC } from "react";
import ShopPage from "./ShopPage";

export const metadata = {
    title: 'Shop | Herbalism',
    description: 'Xem danh sách các sản phẩm thảo dược thiên nhiên giúp cải thiện sức khỏe, tăng cường miễn dịch và giảm căng thẳng.',
};

const Main: FC = () => {
    return <ShopPage/>
}

export default Main;