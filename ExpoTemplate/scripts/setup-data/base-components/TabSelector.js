import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import TextBase from "./TextBase";

const TabSelector = ({ initialTab, tabs, onSelectionChanged, style, styleTab, styleTabText, styleSelectedTab, styleSelectedTabText }) => {
  const [selectedTab, setSelectedTab] = useState(initialTab || tabs?.[0]);

  useEffect(()=>{
    if(initialTab)
    {
      setSelectedTab(initialTab);
    }
  }, [initialTab])

  const handleSelect = (name) => {
    setSelectedTab(name);
    onSelectionChanged && onSelectionChanged(name);
  };

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isSelected = tab === selectedTab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, styleTab, isSelected && [styles.selectedTab, styleSelectedTab]]}
            onPress={() => handleSelect(tab)}
          >
            <TextBase style={[styles.tabText, styleTabText, isSelected && styleSelectedTabText]}>
              {tab}
            </TextBase>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "grey",
    borderRadius: 12
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTab: {
    backgroundColor: "black",
  },
  tabText: {
    color: "white",
    fontSize: 16,
  }
});

export default TabSelector;
