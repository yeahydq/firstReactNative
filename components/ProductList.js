import React,{Component} from 'React';
import {
StyleSheet,
FlatList,
View,
Dimensions
} from 'react-native';
import ListItem from './ListItem';
const SCREEN_WIDTH = Dimensions.get('window').width;

class ProductList extends Component {
    state = {
        columns: 2,
        key: 1,
        array: [],
    }

    constructor(props) {
        super(props)
        this.getProducts = this.getProducts.bind(this)
    }

    getProducts() {
        //JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
        //JSON.parse() 方法用于将一个 JSON 字符串转换为对象
        fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1',{
            method: 'GET'
        }).then((response)=> {
            return response.json()
        }).then((respnoseJson) => {
            return JSON.parse(respnoseJson.recommend)
        }).then((recommend) => {
            // console.log(recommend.wareInfoList)
            let newArray = this.state.array.slice()
            let concatArray = newArray.concat(recommend.wareInfoList)
            this.setState({
                array: concatArray
            })
        }).catch((error) => {
            console.warn(error);
        }).done();
    }

    componentDidMount(){
        this.getProducts()
    }

    onPressingItem(wareId) {
        //console.log(wareId)
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';
        this.props.nav.push({
            id: 'webview',
            title: 'webview',
            url: url
        });
    }

    render() {
        const { columns, key, array } = this.state
        return (
            <View style = {styles.container}>
                <FlatList
                    key = {key}
                    numColumns = {columns}
                    data = {array}
                    renderItem = {({ item, index }) => {
                        return <ListItem
                            id = {item.wareId}
                            itemWidth = {SCREEN_WIDTH / columns - 2 }
                            image = {{ uri: item.imageurl }}
                            wname = { item.wname }
                            jdPrice = { item.jdPrice }
                            onPressItem = {this.onPressingItem}
                            />
                    }}
                    keyExtractor = {
                        (item, index) => { return  item.wareId }
                    }
                />
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE9E9',
        justifyContent: 'space-around',
        flexDirection:'row',
    },
})

module.exports=ProductList;
