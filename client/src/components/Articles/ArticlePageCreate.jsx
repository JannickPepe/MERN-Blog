import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ArticlePageCreate = () => {

    const { currentUser, } = useSelector((state) => state.user);

    return (
        <div>
            {currentUser.isAdmin && (
                <Link to={'/create-article'}>
                    <Button type='button' gradientDuoTone='purpleToPink' className='w-fuææ mx-auto my-4 md:my-8'>
                        Create an article
                    </Button>
                </Link>
            )}
        </div>
    )

}

export default ArticlePageCreate
