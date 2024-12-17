import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ArticlePageCreate = () => {

    const { currentUser, } = useSelector((state) => state.user);

    return (
        <div>
            {currentUser.isAdmin && (
                <Link to={'/create-article'}>
                    <Button type='button' className='mx-auto my-4 md:my-8  font-medium bg-teal-600 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]'>
                        Create an article
                    </Button>
                </Link>
            )}
        </div>
    )

}

export default ArticlePageCreate
