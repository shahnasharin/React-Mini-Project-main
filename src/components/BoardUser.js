import React,{useState,useEffect,useRef} from 'react';
import userService from '../services/user.service';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   
import 'primereact/resources/primereact.css';                      
import 'primeicons/primeicons.css';                                 
import 'primeflex/primeflex.css';  

const BoardUser= ()=>{

    const [content,setContent]=useState('');
    const [image,setImage] = useState(null)
    useEffect(() => {

      }, [image]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        
    }
    const handleFileUpload = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('profile_picture',image,image.name);
        userService.imageUpload(form_data).then(res => {
            userService.getUserBoard().then((response)=>{
                setContent(response.data);
            })
        })
    }
    
    useEffect(()=>{
        userService.getUserBoard().then((response)=>{
            setContent(response.data);
        },
        (error)=>{
            const _content = (
                error.response &&
                error.response.data &&
                error.response.data.message)||
                error.message||
                error.toString();
            setContent(_content);
        }
        )
    },[])
    const header = (
        <img alt="Card" src={`http://127.0.0.1:8000/${content.profile_picture}`} style={{borderRadius:'100px',height:'200px',width:'200px'}}/>
    );
    const footer = (
        <div className="flex flex-wrap justify-content-center gap-2">
                <div>
        <form onSubmit={handleFileUpload}>
        <input type='file' onChange={handleFileChange}   name='profile_picture'id='file'/>
        <button type='submit'>Upload</button>
        </form>
    </div>
        </div>
    );

    return(
        <div className="container">
        <header className="jumbotron">

        <div className="card flex justify-content-center">
            <Card title={content.username} subTitle={content.is_superuser?'Admin':'User'} footer={footer} header={header} className="md:w-25rem">
                <li>
                    Phone Number: {content.mobile_number}
                </li>
                <li>
                    Email: {content.email}
                </li>
                <li>
                    Date Of Birth: {content.date_of_birth}

                </li>
            </Card>
        </div>

        </header>
      </div>
    );
};
export default BoardUser;