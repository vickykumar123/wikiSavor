import {MenuItem} from "@/types";
import {Card, CardContent, CardTitle} from "./ui/card";
import {Button} from "./ui/button";

type Props = {
  menuItem: MenuItem;
  addToCart?: () => void;
};

const MenuItems = ({menuItem, addToCart}: Props) => {
  return (
    <Card className="shadow-md">
      <CardContent className="font-bold mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <CardTitle>{menuItem.name}</CardTitle>
          <span>${menuItem.price.toFixed(2)}</span>
        </div>
        <Button variant="submit" onClick={addToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItems;
