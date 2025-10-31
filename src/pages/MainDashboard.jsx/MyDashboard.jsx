import React from 'react'
import DashboardHeader from '../../Compo/DashboardHeader'
import CityDataCard from '../../Compo/CityDataCard';
const MyDashboard = () => {
  return (
    <>
       <div>
        <DashboardHeader/>
    </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
      <CityDataCard 
        imageUrl="https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTU5M2FmYjQwLTk3MjAtMTFlZi04YTBkLWIzMzdmNjgxZjg3My5qcGc%3D"
        title="Amritsar district, Punjab"
        author="Ahmed Mohamed Zaki"
        lastUpdated="2 days ago"
        usabilityScore="10.0"
        fileSize="16"
        downloadCount="15.6K"
        fileType="1 File (CSV)"
        upvotes={532}
        authorAvatar="https://example.com/avatar.jpg"
        datasetId="3"
      />
      <CityDataCard 
        imageUrl="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202503/byrnihat-on-the-meghalaya-assam-border-is-the-most-polluted-city-in-the-world-133902232-16x9_0.jpg?VersionId=36lnXBmcYOaLI3Ceufls.qn1kL46DVwR&size=690:388"
        title="Byrnihat,Meghalaya"
        author="Ahmed Mohamed Zaki"
        lastUpdated="2 days ago"
        usabilityScore="10.0"
        fileSize="16"
        downloadCount="15.6K"
        fileType="1 File (CSV)"
        upvotes={532}
        authorAvatar="https://example.com/avatar.jpg"
      />
     
    </div>
    </>
  )
}

export default MyDashboard
