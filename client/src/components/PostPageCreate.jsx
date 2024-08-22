import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const PostPageCreate = () => {

    const { currentUser, } = useSelector((state) => state.user);

    return (
        <div>
            {currentUser.isAdmin && (
                <Link to={'/create-post'}>
                    <Button type='button' gradientDuoTone='purpleToPink' className='w-1/2 mx-auto my-4 md:my-8'>
                        Create a post
                    </Button>
                </Link>
            )}
        </div>
    )

}

export default PostPageCreate
