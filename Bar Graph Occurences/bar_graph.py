import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import csv

# Read CSV file
data = pd.read_csv("known_exploited_vulnerabilities.csv")
df = pd.DataFrame(data)

occurrences = df['product']

df.to_csv('filtered_Data.csv')

# First count the instances of each product
data = pd.read_csv('filtered_Data.csv')
company = data['product'].tolist()

d = dict()

for line in data: 
    
    for word in company:
        if word in d:
            d[word] = d[word] + 1
        else: 
            d[word] = 1

# Converting the column data into a list
with open('filtered_Data.csv', 'w', newline='') as file:
    writer = csv.writer(file)

    writer.writerow(["Product", "Number of Occurrences"])
    for key in list(d.keys()):
        writer.writerow([key, int(d[key])])

file.close()

data = pd.read_csv('filtered_Data.csv')
df = pd.DataFrame(data)

num = 25
df2 = df.nlargest(n= num, columns= "Number of Occurrences", keep= "all")

Y = df2['Product'].head(num)
X = df2['Number of Occurrences'].head(num)

# Figure Size
fig, ax = plt.subplots(figsize= (16,9))
 
# Horizontal Bar Plot
hell = ax.barh(Y, X, align="center")
 
# Remove axes splines
for s in ['top', 'bottom', 'left', 'right']:
    ax.spines[s].set_visible(False)
 
# Remove x, y Ticks
ax.xaxis.set_ticks_position('none')
ax.yaxis.set_ticks_position('none')
 
# Add padding between axes and labels
ax.xaxis.set_tick_params(pad = 5)
ax.yaxis.set_tick_params(pad = 10)

# Show top values
ax.invert_yaxis()
ax.invert_xaxis()
 
# Add Plot Title and axis labels
ax.bar_label(hell, fmt='%.0f')
ax.set_xlabel("Occurrences")
ax.set_title('Top 25 Vulnerabilities and Exposures',
             loc ='center')

# Show Plot
plt.tight_layout(pad=10)
plt.savefig("top_25_occurrences.png")
plt.show()
