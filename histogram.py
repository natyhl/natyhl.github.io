import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the CSV file
df = pd.read_csv('Smartphone.csv')

# Create a figure and axis
plt.figure(figsize=(10, 6))

# Create histogram
sns.histplot(data=df, x='Daily_Phone_Hours', bins=10)

# Customize the plot
plt.xlabel('Daily Phone Hours', fontsize=12)
plt.ylabel('Frequency', fontsize=12)
plt.title('Daily Phone Usage Hours - Histogram', fontsize=15)
plt.grid(True, alpha=0.3)

plt.tight_layout()

# Display the plot
plt.show()
