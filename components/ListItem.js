import React,{Component} from 'React';
import {
TouchableWithoutFeedback,
Image,
Animated,
View,
Text
} from 'react-native';

export default class ListItem extends Component {


	render() {
		const { id, itemWidth, image, wname, jdPrice, onPressItem } = this.props
		//console.log(onPressItem)
		return (
			<TouchableWithoutFeedback style={{flex:1,alignItems:'center'}} onPress = {() => onPressItem(id)}>
				<View style = {{marginTop: 2, marginBottom: 2, paddingRight: 4, }}>
					<Image style={{ width: itemWidth, height: 200 }} source={image} />
					<Text numberOfLines={4}
                        style={{
                            width: itemWidth,
                            flexWrap: 'wrap',
                            fontSize: 12,
                            color: 'black',
                            flex: 1,
                            paddingLeft: 5,
                            paddingRight: 5,
                            height: 65,
                            backgroundColor: 'white'
                        }}
                    >{wname}</Text>
                    <View style={{flexDirection:'row',justifyContent: 'space-around',paddingRight: 10,backgroundColor: 'white',paddingBottom: 5}}>
                        <Text
                            style={{
                                flex: 1,
                                alignSelf: 'flex-start',
                                textAlign: 'left',
                                paddingLeft: 5,
                                fontSize: 13,
                                color: '#f15353'
                            }}
                        >￥{jdPrice}</Text>
                        <TouchableWithoutFeedback>
                            <View
                                style={{
                                    width:50,
                                    height:20,
                                    backgroundColor: 'pink',
                                    borderRadius:30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{color:'#f15353',fontSize:12,textAlign:'center'}}>看相似</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}