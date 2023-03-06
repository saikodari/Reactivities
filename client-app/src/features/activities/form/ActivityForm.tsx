import { observer } from "mobx-react-lite";
import { useEffect, useState }  from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik,Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/TextArea";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm(){
    const {activityStore}=useStore();
    const {createActivity,updateActivity
        ,loading,loadActivity,loadingIntial} = activityStore;
        const {id}= useParams<{id:string}>();
        const navigate = useNavigate();
        const[activity,setActivity]=useState<Activity>({
            id:'',
            title:'',
            date: null,
            description: '',
            category: '',
            city: '',
            venue: ''
        });
        const validationSchema = Yup.object({
            title: Yup.string().required('The activity title is required'),
            description: Yup.string().required('The description title is required'),
            category: Yup.string().required(),
            date: Yup.string().required('Date is required'),
            city: Yup.string().required(),
            venue: Yup.string().required(),
        })
        useEffect(()=>{
            if(id) loadActivity(id).then(activity=>setActivity(activity!));
        },[id,loadActivity])
   function handleFormSubmit(activity: Activity){
    if(!activity.id)
    {
        activity.id = uuid();
        createActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
    }else{
        updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
    }   
   }

   if(loadingIntial) return <LoadingComponent content='Loading Activity...'/>
    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='red'/>
            <Formik validationSchema={validationSchema}
             enableReinitialize 
             initialValues={activity} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit,dirty,isValid,isSubmitting})=>(
                      <Form className='ui form'  onSubmit={handleSubmit} autoComplete="off">
                      <MyTextInput name='title' placeholder="Title"/>
                      <MyTextArea rows={3} placeholder='Description' name='description'/>
                      <MySelectInput options={categoryOptions} placeholder='Category' name='category'/>
                      <MyDateInput  
                      placeholderText='Date'
                       name='date'
                       showTimeSelect
                       timeCaption='time'
                       dateFormat='MMMM d, yyyy h:mm aa'
                      />
                    <Header content='Location Details' sub color='red'/>
                      <MyTextInput placeholder='City' name='city'/>
                      <MyTextInput placeholder='Venue' name='venue'/>
                      <Button 
                      disabled={isSubmitting || !dirty || !isValid}
                      loading={loading}
                       floated='right' positive type='submit' content='Submit'/>
                      <Button as={Link} to='/activities' floated='right'  type='button' content='Cancel'/>
                  </Form>
                )}
            </Formik>
          
        </Segment>
    )
})