import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layouts/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";



export default observer(function ActivityBashboard() {
  const {activityStore} = useStore();
  const {loadActivities,activityRegistry} = activityStore;
  useEffect(() => {  
    if(activityRegistry.size <= 1) loadActivities();
  }, [activityStore,loadActivities,activityRegistry.size]);
   if(activityStore.loadingIntial) return <LoadingComponent content='Loading activities...'/>
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters/>        
      </Grid.Column>
    </Grid>
  );
}
)