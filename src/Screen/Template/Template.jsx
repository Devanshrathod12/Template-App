import { StyleSheet, Text, View ,SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import TempHeader from '../../Components/TemplateComponent/TempHeader'
import TempNewArrivals from '../../Components/TemplateComponent/TempNewArrivals'
import TempAllCategories from '../../Components/TemplateComponent/TempAllCategories'
import TempFramesShapes from '../../Components/TemplateComponent/TempFramesShapes'
import TempTrendingFramesSection from "../../Components/TemplateComponent/TempTrendingFramesSection"
import colors from '../../styles/colors'
const Template = () => {
  return (
    <>
    <SafeAreaView>
        <ScrollView>
    <TempHeader/>
    <TempNewArrivals/>
    <TempAllCategories/>
    <TempTrendingFramesSection/>
    <TempFramesShapes styles={styles.shapframe}/>
        </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default Template

const styles = StyleSheet.create({
    shapframe:colors.WhiteBackgroudcolor
})